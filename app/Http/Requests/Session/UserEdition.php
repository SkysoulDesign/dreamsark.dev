<?php

namespace DreamsArk\Http\Requests\Session;

use DreamsArk\Http\Requests\Request;

/**
 * Class UserEdition
 *
 * @package DreamsArk\Http\Requests\Session
 */
class UserEdition extends Request
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
            'name'     => 'required',
            'password' => 'min:6'
        ];
    }

}
