<?php

namespace DreamsArk\Http\Requests\Admin\Question;

use DreamsArk\Http\Requests\Request;
use DreamsArk\Models\Master\Question\Type;

/**
 * Class QuestionnaireRequest
 *
 * @package DreamsArk\Http\Requests\Admin
 */
class StoreQuestionRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('create-question', $this->user());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @param Type $type
     * @return array
     */
    public function rules(Type $type)
    {
        return [
            'question' => 'required',
            'type' => "required|exists:{$type->getTable()},id"
        ];

    }

}
