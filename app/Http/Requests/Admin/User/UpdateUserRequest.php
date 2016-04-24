<?php

namespace DreamsArk\Http\Requests\Admin\User;

use DreamsArk\Http\Requests\Request;

/**
 * Class UpdateUserRequest
 *
 * @package DreamsArk\Http\Requests\Admin\User
 */
class UpdateUserRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('update-user', $this->user());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => "required|unique:users,username,{$this->user->id}",
            'email' => "required|email|unique:users,email,{$this->user->id}",
            'password' => 'sometimes|confirmed|min:6',
        ];

    }

}
