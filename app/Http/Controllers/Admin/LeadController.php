<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreLeadRequest;
use App\Models\Hospital;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    /**
     * Display a paginated list of leads.
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        $query = Lead::with(['hospital', 'disease', 'location'])->orderBy('created_at', 'desc');

        // Apply Tenant Scope if Hospital Manager
        if ($user->hasRole('hospital_manager')) {
            $query->where('hospital_id', $user->hospital_id);
        }

        // Apply Optional Filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('campaign')) {
            $query->where('campaign_type', $request->campaign);
        }

        $leads = $query->paginate(20)->withQueryString()->through(fn ($lead) => [
            'id' => $lead->id,
            'name' => $lead->name,
            'phone' => $lead->phone,
            'status' => $lead->status,
            'source_url' => $lead->source_url,
            'campaign_type' => $lead->campaign_type,
            'created_at' => $lead->created_at->format('Y-m-d H:i'),
            'hospital' => $lead->hospital ? $lead->hospital->name : 'N/A',
            'disease' => $lead->disease ? $lead->disease->name : null,
            'location' => $lead->location ? $lead->location->name : null,
        ]);

        return Inertia::render('Admin/Leads/Index', [
            'leads' => $leads,
            'filters' => $request->only(['status', 'campaign']),
        ]);
    }

    /**
     * Inline update for a Lead's status.
     */
    public function updateStatus(Request $request, Lead $lead)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,contacted,converted,lost',
        ]);

        // Security check for Hospital Managers
        if (auth()->user()->hasRole('hospital_manager') && $lead->hospital_id !== auth()->user()->hospital_id) {
            abort(403, 'Unauthorized access to this lead.');
        }

        $lead->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Lead status updated.');
    }

    /**
     * Store a new lead from the public frontend forms.
     */
    public function store(StoreLeadRequest $request)
    {
        $validated = $request->validated();

        // If no hospital specified, try to find the nearest one via LeadService
        if (empty($validated['hospital_id'])) {
            $hospital = Hospital::where('is_active', true)->first();
            $validated['hospital_id'] = $hospital?->id;
        }

        $validated['status'] = 'new';
        $validated['campaign_type'] = 'seo_page';

        $lead = Lead::create($validated);

        // Check if request is AJAX/API call
        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Lead captured successfully.',
                'data' => $lead,
            ]);
        }

        return redirect()->back()->with('success', 'Lead captured successfully.');
    }
}