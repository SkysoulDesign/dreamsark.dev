<?php

namespace DreamsArk\Http\Requests\Admin\Profile;

use DreamsArk\Http\Requests\Request;

/**
 * Class ProfileRequest
 *
 * @package DreamsArk\Http\Requests\Admin
 */
class StoreProfileRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('create-profile');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        return [
            'name' => 'required|unique:profiles',
            'display_name' => 'required',
        ];

    }

}
