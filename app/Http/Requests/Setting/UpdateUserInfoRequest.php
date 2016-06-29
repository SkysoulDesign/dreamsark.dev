<?php

namespace DreamsArk\Http\Requests\Setting;

use DreamsArk\Http\Requests\Request;

class UpdateUserInfoRequest extends Request
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
            'email'    => 'required|email|unique:users,id,'.auth()->user()->id,
            'password' => 'required|min:6',
        ];
    }
}
