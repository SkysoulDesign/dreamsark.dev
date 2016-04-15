<?php

namespace DreamsArk\Http\Requests\Admin;

use DreamsArk\Http\Requests\Request;

class AdminUserRequest extends Request
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
        $updateEmail = ($this->user && $this->user->email === $this->request->get('email')) ? ',id,' . $this->user->id : '';
        $updateUser = ($this->user && $this->user->username === $this->request->get('username')) ? ',id,' . $this->user->id : '';

        return [
            'username' => 'required|unique:users'.$updateUser,
            'email'    => 'required|email|unique:users'.$updateEmail,
            'password' => ($this->user?'sometimes':'required').'|confirmed|min:6',
        ];
    }
}
