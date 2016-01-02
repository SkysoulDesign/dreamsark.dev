<?php

namespace DreamsArk\Http\Requests\Project\Submission;

use DreamsArk\Http\Requests\Request;

class Submissioning extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'content' => 'required',
            'visibility' => 'required|boolean'
        ];
    }
}
