<?php

namespace DreamsArk\Http\Requests\Project;

use DreamsArk\Http\Requests\Request;

/**
 * Class ProjectEdition
 *
 * @package DreamsArk\Http\Requests\Project
 */
class ProjectEdition extends Request
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
            'reward' => 'integer|min:1|required',
            'content' => 'required',
            'voting_date' => 'required|date|after:today',
        ];
    }

    /**
     * @return array
     */
    public function attributes()
    {
        return [
            'reward' => 'Reward',
        ];
    }
}
