<?php

namespace DreamsArk\Http\Requests\Session;

use DreamsArk\Http\Requests\Request;

class UserCreationMobile extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return !auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'required|unique:users',
            'password' => 'required|min:6',
            'sms_code'    => 'required',
        ];
    }
}
