<?php

namespace DreamsArk\Http\Requests\Bag;

use DreamsArk\Http\Requests\Request;

class CoinWithdrawRequest extends Request
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
            'withdraw_amount' => 'required|numeric|max:'.$this->user()->bag->coins.'|min:1',
        ];
    }
}
