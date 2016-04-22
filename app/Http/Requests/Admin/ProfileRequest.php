<?php

namespace DreamsArk\Http\Requests\Admin;

use DreamsArk\Http\Requests\Request;

/**
 * Class ProfileRequest
 * @package DreamsArk\Http\Requests\Admin
 */
class ProfileRequest extends Request
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
        $update = ($this->profile && $this->profile->name === $this->get('name')) ? ',id,' . $this->profile->id : '';
        return [
            'name' => 'required|unique:profiles' . $update,
            'display_name' => 'required'
        ];
    }
}
