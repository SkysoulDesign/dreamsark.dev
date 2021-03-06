<?php

namespace DreamsArk\Http\Requests\User\Profile;

use DreamsArk\Http\Requests\Request;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Master\Question\Question;

/**
 * Class ProfileRequest
 * @package DreamsArk\Http\Requests\User\Profile
 */
class UpdateProfileRequest extends Request
{
    /**
     * @var
     */
//    private $profile;
    /**
     * @var
     */
//    private $questions;

    /**
     * Determine if the user is authorized to make this request.
     * @return bool
     * @internal param Profile $profile
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     * @return array
     * @internal param Profile $profile
     */
    public function rules()
    {

        $rules = [];

        foreach ($this->profile->questions as $question) {
            array_set($rules, "question_$question->id", $this->getRules($question));
        }
        return $rules;

        /*return [
            'profile_id' => 'required|exists:profiles,id',
            'questions.required.*.*' => 'sometimes',
            'questions.general.*.*' => 'sometimes',
            'questions.*.email.*' => 'email',
            'questions.*.tel.*' => 'numeric',
            'questions.*.url.*' => 'url',
            'questions.*.date.*' => 'date_format:Y-m-d',
            'questions.*.number.*' => 'numeric',
            'questions.*.image.*' => 'image',
            'questions.*.video.*' => 'mimes:mp4',
        ];*/
    }

    public function getRules(Question $question)
    {

        $rules = [];

        array_push($rules, ($question->pivot->required?'required':'sometimes'));

        switch ($question->type->name) {
            case "text":
                array_push($rules, 'string');
                break;
            case "email":
                array_push($rules, 'email');
                break;
            case "video":
                array_push($rules, 'mimes:mp4');
                break;
            case "image":
                array_push($rules, 'image');
                break;
            case "number":
                array_push($rules, 'numeric');
                break;
            case "date":
                array_push($rules, 'date_format:Y-m-d');
                break;
            case "url":
                array_push($rules, 'url');
                break;
            default:
                break;

        }

        return implode("|", $rules);

    }

    /**
     * Set custom attributes for validator errors.
     * @return array
     */
    public function attributes()
    {
        return $this->profile->questions->flatMap(function ($question) {
            return ["question_$question->id" => $question->question];
        })->toArray();

        /*$attributes = [];
        $this->buildProfileObj();
        foreach ($this->profile->questions as $question) {
            $index = $question->pivot->required ? 'required' : 'general';
            $attributes['questions.' . $index . '.' . $question->type->name . '.' . $question->id] = $question->question;
        }
        return $attributes;*/
    }

    /**
     * To get Profile Object
     */
    public function buildProfileObj()
    {
        $this->questions = array_flatten($this->request->get('questions'));

        $this->profile = Profile::findOrFail($this->request->get('profile_id'));
    }

}
