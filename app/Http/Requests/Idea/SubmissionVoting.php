<?php

namespace DreamsArk\Http\Requests\Idea;

use DreamsArk\Http\Requests\Request;

class SubmissionVoting extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'amount' => 'required|integer|between:1,' . $this->user()->bag->coins
        ];
    }
}
