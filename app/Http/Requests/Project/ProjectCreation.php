<?php

namespace DreamsArk\Http\Requests\Project;

use DreamsArk\Http\Requests\Request;

class ProjectCreation extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'        => 'required',
            'reward'      => 'required|integer|between:1,' . $this->user()->bag->coins,
            'content'     => 'required',
            'type'        => 'required|in:idea,synapse,script',
            'voting_date' => 'required|date',
        ];
    }
}
