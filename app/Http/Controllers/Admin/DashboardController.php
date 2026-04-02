<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hospital;
use App\Models\Lead;
use App\Models\Location;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $isManager = $user->hasRole('hospital_manager');

        // Base Query scoped to Hospital Manager if necessary
        $leadQuery = Lead::query();
        if ($isManager) {
            $leadQuery->where('hospital_id', $user->hospital_id);
        }

        $totalLeads = (clone $leadQuery)->count();
        $newLeads = (clone $leadQuery)->where('status', 'new')->count();
        $convertedLeads = (clone $leadQuery)->where('status', 'converted')->count();

        // Calculate Conversion Rate securely
        $conversionRate = $totalLeads > 0
            ? round(($convertedLeads / $totalLeads) * 100, 1)
            : 0;

        $stats = [
            'totalLeads' => $totalLeads,
            'newLeads' => $newLeads,
            'convertedLeads' => $convertedLeads,
            'conversionRate' => $conversionRate,
            'activeLocations' => $isManager ? 1 : Location::active()->count(),
            'activeHospitals' => $isManager ? 1 : Hospital::where('is_active', true)->count(),
        ];

        return Inertia::render('Admin/Dashboard/Index', [
            'stats' => $stats,
        ]);
    }
}
