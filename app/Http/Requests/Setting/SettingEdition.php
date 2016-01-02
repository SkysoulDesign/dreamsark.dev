<?php

namespace DreamsArk\Http\Requests\Setting;

use DreamsArk\Http\Requests\Request;

class SettingEdition extends Request
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
            'language' => 'in:cn,en'
        ];
    }
}
