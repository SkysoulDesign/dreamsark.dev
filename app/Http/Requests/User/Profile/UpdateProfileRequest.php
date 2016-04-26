<?php

namespace DreamsArk\Http\Requests\User\Profile;

use DreamsArk\Http\Requests\Request;
use DreamsArk\Models\Master\Profile;

/**
 * Class ProfileRequest
 * @package DreamsArk\Http\Requests\User\Profile
 */
class UpdateProfileRequest extends Request
{
    /**
     * @var
     */
    private $profile;
    /**
     * @var
     */
    private $questions;

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

        return [
            'profile_id' => 'required|exists:profiles,id',
            'questions.required.*.*' => 'sometimes',
            'questions.general.*.*' => 'sometimes',
            'questions.*.email.*' => 'email',
//            'questions.*.tel.*' => 'Regex:/^\(\d{3}\) \d{3}-\d{4}$/',
            'questions.*.tel.*' => 'numeric',
            'questions.*.url.*' => 'url',
            'questions.*.date.*' => 'date_format:Y-m-d',
            'questions.*.number.*' => 'numeric',
            'questions.*.image.*' => 'image',
            'questions.*.video.*' => 'mimes:mp4',
        ];
    }

    /**
     * Set custom attributes for validator errors.
     * @return array
     */
    public function attributes()
    {
        $attributes = [];
        $this->buildProfileObj();
        foreach ($this->profile->questions as $question) {
            $index = $question->pivot->required ? 'required' : 'general';
            $attributes['questions.' . $index . '.' . $question->type->name . '.' . $question->id] = $question->question;
        }
//        dd($attributes);
        return $attributes;
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
