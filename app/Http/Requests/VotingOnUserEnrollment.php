<?php

namespace DreamsArk\Http\Requests;

class VotingOnUserEnrollment extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->enroller->votes()->whereUserId($this->user()->id)->get()->isEmpty();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }
}
