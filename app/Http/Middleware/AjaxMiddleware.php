<?php

namespace DreamsArk\Http\Middleware;

use Closure;

class AjaxMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->ajax() || $request->pjax())
            return $next($request);
        return response()->json(['error' => trans('auth.access-denied')]);
    }
}
