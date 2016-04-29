<?php

namespace DreamsArk\Http\Requests\Admin\User;

use DreamsArk\Http\Requests\Request;

/**
 * Class StoreUserRequest
 *
 * @package DreamsArk\Http\Requests\Admin\User
 */
class StoreUserRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('create-user', $this->user());
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
            'email'    => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6',
        ];

    }

}
