<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
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
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'digits:10'],
            'email' => ['nullable', 'email'],
            'hospital_id' => ['nullable', 'exists:hospitals,id'],
            'disease_id' => ['nullable', 'exists:diseases,id'],
            'location_id' => ['nullable', 'exists:locations,id'],
            'source_url' => ['nullable', 'string', 'max:500'],
        ];
    }
}
