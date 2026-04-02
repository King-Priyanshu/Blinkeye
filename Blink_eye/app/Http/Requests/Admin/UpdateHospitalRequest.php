<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateHospitalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $hospitalId = $this->route('hospital')->id ?? null;

        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', Rule::unique('hospitals', 'slug')->ignore($hospitalId)],
            'domain' => ['nullable', 'string', Rule::unique('hospitals', 'domain')->ignore($hospitalId)],
            'subdomain' => ['nullable', 'string', Rule::unique('hospitals', 'subdomain')->ignore($hospitalId)],
            'email' => ['required', 'email'],
            'phone' => ['required', 'string'],
            'location_id' => ['nullable', 'exists:locations,id'],
            'lat' => ['nullable', 'numeric', 'between:-90,90'],
            'lng' => ['nullable', 'numeric', 'between:-180,180'],
            'is_active' => ['boolean'],
            'custom_domain' => ['nullable', 'string', 'max:255'],
            'template_id' => ['required', 'integer', 'min:1', 'max:5'],
            'image' => ['nullable', 'image', 'max:2048'],
            // Dynamic Appearance & Map
            'primary_color' => ['nullable', 'string', 'max:50'],
            'secondary_color' => ['nullable', 'string', 'max:50'],
            'background_image' => ['nullable', 'image', 'max:4096'],
            'map_url' => ['nullable', 'string', 'max:1000'],
            'map_zoom' => ['nullable', 'integer', 'min:1', 'max:20'],
            // Contact Information
            'address' => ['nullable', 'string', 'max:500'],
            'emergency_contact' => ['nullable', 'string', 'max:50'],
            'whatsapp' => ['nullable', 'string', 'max:50'],
            // Working Hours
            'working_hours_weekday' => ['nullable', 'string', 'max:100'],
            'working_hours_saturday' => ['nullable', 'string', 'max:100'],
            'working_hours_sunday' => ['nullable', 'string', 'max:100'],
            'is_24_7_emergency' => ['boolean'],
            // Social Media
            'facebook' => ['nullable', 'url', 'max:255'],
            'instagram' => ['nullable', 'url', 'max:255'],
            'twitter' => ['nullable', 'url', 'max:255'],
            'youtube' => ['nullable', 'url', 'max:255'],
            'linkedin' => ['nullable', 'url', 'max:255'],
            // Additional Information
            'short_description' => ['nullable', 'string', 'max:500'],
            'about_us' => ['nullable', 'string'],
            'established_year' => ['nullable', 'integer', 'min:1800', 'max:2100'],
            'number_of_beds' => ['nullable', 'integer', 'min:1'],
            'number_of_doctors' => ['nullable', 'integer', 'min:1'],
            'amenities' => ['nullable', 'array'],
            'accreditations' => ['nullable', 'string', 'max:500'],
            'languages' => ['nullable', 'array'],
            // SEO Fields
            'meta_title' => ['nullable', 'string', 'max:70'],
            'meta_description' => ['nullable', 'string', 'max:160'],
            'meta_keywords' => ['nullable', 'string', 'max:255'],
            'og_image' => ['nullable', 'string', 'max:500'],
            'canonical_url' => ['nullable', 'url', 'max:255'],
            // Pivot relationships
            'service_ids' => ['nullable', 'array'],
            'service_ids.*' => ['integer', 'exists:services,id'],
            'disease_ids' => ['nullable', 'array'],
            'disease_ids.*' => ['integer', 'exists:diseases,id'],
            'group_ids' => ['nullable', 'array'],
            'group_ids.*' => ['integer', 'exists:groups,id'],
            'blog_ids' => ['nullable', 'array'],
            'blog_ids.*' => ['integer', 'exists:blogs,id'],
            // Doctor Assignment
            'doctor_ids' => ['nullable', 'array'],
            'doctor_ids.*' => ['integer', 'exists:doctors,id'],
        ];
    }
}
