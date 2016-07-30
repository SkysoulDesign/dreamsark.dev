<?php

namespace DreamsArk\Http\Requests\Project;

use DreamsArk\Http\Requests\Request;

/**
 * Class SynapseScriptCreation
 *
 * @package DreamsArk\Http\Requests\Project
 */
class SynapseScriptCreation extends Request
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
            'reward' => 'required|integer|between:1,' . $this->user()->bag->coins,
            'voting_date' => 'required|date|after:today',
        ];
    }
}
