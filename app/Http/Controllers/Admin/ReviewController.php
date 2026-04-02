<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hospitalId = auth()->user()->hospital_id ?? null;

        $reviews = Review::when($hospitalId, fn ($q) => $q->where('hospital_id', $hospitalId))
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return inertia('Admin/Reviews/Index', [
            'reviews' => $reviews,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Reviews/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'author_name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'content' => 'nullable|string',
            'source' => 'required|string|max:255',
        ]);

        $hospitalId = auth()->user()->hospital_id ?? null;

        if (! $hospitalId) {
            return redirect()->back()->with('error', 'No hospital assigned to your account.');
        }

        Review::create([
            'hospital_id' => $hospitalId,
            ...$validated,
        ]);

        return redirect()->route('admin.reviews.index')
            ->with('success', 'Review created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        $hospitalId = auth()->user()->hospital_id;
        if ($review->hospital_id !== $hospitalId) {
            abort(403, 'Unauthorized');
        }

        return inertia('Admin/Reviews/Edit', [
            'review' => $review,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        $hospitalId = auth()->user()->hospital_id;
        if ($review->hospital_id !== $hospitalId) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'author_name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'content' => 'nullable|string',
            'source' => 'required|string|max:255',
        ]);

        $review->update($validated);

        return redirect()->route('admin.reviews.index')
            ->with('success', 'Review updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $hospitalId = auth()->user()->hospital_id;
        if ($review->hospital_id !== $hospitalId) {
            abort(403, 'Unauthorized');
        }

        $review->delete();

        return redirect()->route('admin.reviews.index')
            ->with('success', 'Review deleted successfully');
    }
}
