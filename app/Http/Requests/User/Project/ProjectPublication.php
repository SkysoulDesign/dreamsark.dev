<?php

namespace DreamsArk\Http\Requests\User\Project;

use DreamsArk\Http\Requests\Request as Req;
use Illuminate\Http\Request;

class ProjectPublication extends Req
{
    /**
     * ProjectPublication constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $request->merge($request->draft->toArray());
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        return [
            'name'        => 'required',
            'reward'      => 'required|integer|between:1,' . $this->user()->bag->coins,
            'content'     => 'required',
            'type'        => 'required|in:idea,synapse,script',
            'voting_date' => 'required|date',
        ];
    }
}
