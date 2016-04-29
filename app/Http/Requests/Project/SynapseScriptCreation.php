<?php

namespace DreamsArk\Http\Requests\Project;

use DreamsArk\Http\Requests\Request;
use DreamsArk\Models\Project\Project;

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
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        /** @var Project $project */
        $project = $this->project;
        $minValue = 1;
        if (isset($project->getNextStageReward[0]))
            $minValue = $project->getNextStageReward[0]->amount;

        return [
            'content'     => 'required',
            'reward'      => 'required|integer|min:' . $minValue,
            'voting_date' => 'required|date',// |after:today
        ];
    }
}
