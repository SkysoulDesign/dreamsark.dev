<?php

namespace DreamsArk\Http\Middleware;

use Closure;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param $role
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        $message = 'You have no permissions to open this URL';
        if (substr($role, 0, 1) == '!') {
            if ($request->user()->is(str_replace('!', '', $role))) {
                return redirect()->back()->withErrors($message);
            }
        } else if (!$request->user()->is($role)) {
            return redirect()->back()->withErrors($message);
        }
        return $next($request);
    }
}
