<?php

namespace DreamsArk\Services;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Access\Gate as ServiceProvider;

/**
 * Class Gate
 *
 * @package DreamsArk\Services
 */
class Gate extends ServiceProvider
{
    /**
     * Determine if the given ability should be granted for the current user.
     *
     * @param  string $ability
     * @param  array|mixed $arguments
     * @return bool
     */
    public function check($ability, $arguments = []) : bool
    {
        /**
         * Default to auth user if arguments is empty
         */
        if (empty($arguments))
            $arguments = auth()->user();

        try {
            $result = $this->raw($ability, $arguments);
        } catch (AuthorizationException $e) {
            return false;
        }

        return $result;
    }
}
