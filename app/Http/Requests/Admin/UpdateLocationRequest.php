<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateLocationRequest extends FormRequest
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
        $locationId = $this->route('location')->id ?? null;

        return [
            'parent_id' => ['nullable', 'exists:locations,id'],
            'type' => ['required', 'in:state,district,city,village'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', Rule::unique('locations', 'slug')->ignore($locationId)],
            'lat' => ['nullable', 'numeric'],
            'lng' => ['nullable', 'numeric'],
            'is_active' => ['boolean'],
            'image' => ['nullable', 'image', 'max:2048'],
            'pincode' => ['nullable', 'string', 'max:20'],
        ];
    }
}
