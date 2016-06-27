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
//            'batch_fee' => 'required|integer|max:'.$this->user()->bag->coins.'|min:1',
            'batch_fee' => 'required|numeric|max:'.$this->user()->bag->coins,
            'mobile_number' => 'required|integer',
            'real_name' => 'required|string',
            'payment_method' => 'required',
        ];
    }
}
