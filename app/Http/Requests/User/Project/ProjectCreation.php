<?php

namespace DreamsArk\Http\Requests\User\Project;

use DreamsArk\Http\Requests\Request;

/**
 * Class ProjectCreation
 *
 * @package DreamsArk\Http\Requests\User\Project
 */
class ProjectCreation extends Request
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
            'name' => 'required',
            'reward' => 'required|integer|max:' . auth()->user()->bag->coins,
            'content' => 'required',
            'voting_date' => 'required|date|after:today',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'reward' => 'Reward for Idea',
        ];
    }
}
