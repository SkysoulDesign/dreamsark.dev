<?php

namespace DreamsArk\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\Authorize as AuthorizeParent;

class Authorize extends AuthorizeParent
{
    /**
     * Method Overridden here
     * Get the arguments parameter for the gate.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string|null  $model
     * @return array|string|\Illuminate\Database\Eloquent\Model
     */
    protected function getGateArguments($request, $model)
    {
        // If there's no model, we'll pass an empty array to the gate. If it
        // looks like a FQCN of a model, we'll send it to the gate as is.
        // Otherwise, we'll resolve the Eloquent model from the route.
        if (is_null($model)) {
            // instead of [] return Auth::user
            return auth()->user();
        }

        if (strpos($model, '\\') !== false) {
            return $model;
        }

        return $request->route($model);
    }

}
