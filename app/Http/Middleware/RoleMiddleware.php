<?php

namespace DreamsArk\Http\Middleware;

use Closure;

/**
 * Class RoleMiddleware
 *
 * @package DreamsArk\Http\Middleware
 */
class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param $roles
     * @return mixed
     */
    public function handle($request, Closure $next, $roles)
    {

        /**
         * if Not logged in Redirect to Login
         */
        if (!$user = $request->user()) {
            return redirect()->guest(route('login'));
        }

        /**
         * Parse Arguments
         */
        $arguments = $this->parseArgs(array_slice(func_get_args(), 2));

        if (!call_user_func_array([$user, "hasRoles"], $arguments)) {
            return response(trans('auth.unauthorized-no-roles'), 401);
        }

        return $next($request);

    }

    /**
     * Parse pipes on arguments
     *
     * @param $args
     * @return mixed
     */
    public function parseArgs($args)
    {
        return array_map(function ($arg) {
            return str_contains($arg, '|') ? explode('|', $arg) : $arg;
        }, $args);

    }

}
