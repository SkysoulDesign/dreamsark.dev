<?php

namespace DreamsArk\Models\Traits;

use Illuminate\Database\Eloquent\Model;

/**
 * Class RolesAndPermissionTrait
 *
 * @package DreamsArk\Models\Traits
 */
trait ModelDetentionTrait
{

    /**
     * Magic Method to intercept any call starting with has
     * usage $model->hasSomething($1, $2) = must to have $1 and $2
     * usage $model->hasSomethingS([$1, $2, $3...], $4) = must to have ($1 or $2 or $3) and $4
     *
     * @param $method
     * @param $parameters
     * @return $this|mixed
     */
    public function __call($method, $parameters)
    {

        if (str_contains($method, 'has')) {
            array_push($parameters, substr($method, 3));

            return call_user_func_array([$this, 'has'], $parameters);
        }

        return $this;

    }

    /**
     * Method to check User have profile with $name (Ex: actor)
     *
     * @param string|string[]|Model $name
     * @param string $model
     * @return bool
     */
    public function has($name, $model)
    {

        /**
         * Try tp cast to int, if it is not possible then assume there is a field called name
         */
//        $identifier = $name instanceof Model ? "name" : (int)$name ? "id" : "name";

        /**
         * @todo accept array with mixed values [Profile, name, id]
         */
        if ($name instanceof Model xor is_array($name)) {
            $identifier = 'name';
        } else {
            $identifier = (int)$name ? "id" : "name";
        }

        /**
         * Get attribute from model
         */
        if ($name instanceof Model) {

            $attributes = $name->getAttributes();

            /**
             * if key exists then override the name with its respective value
             */
            if (key_exists($identifier, $attributes)) {
                $name = $name->getAttribute($identifier);
            }

            /**
             * Check if primary key exists
             */
            if (!key_exists($identifier, $attributes)) {
                $identifier = $name->getKeyName();
                $name = $name->getKey();
            }

        }

        /**
         * Keep a Result to compare later
         */
        $result = [];

        /**
         * For each arguments other than two, recursively call this function
         */
        if (func_num_args() > 2) {

            foreach ($args = func_get_args() as $role)
                array_push($result, call_user_func([$this, 'has'], $role, last($args)));

            /**
             * Remove Last Value
             */
            array_pop($result);

            return count($args) - 1 === count(array_filter($result));

        }

        /**
         * if $model is singular, means the user is trying to call for example ->hasRole
         */
        if ($this->isSingular($model)) {

            /**
             * Needs to be implemented, this should be useful in the future
             */
            if (method_exists($this, $model)) {
                dd('Not Implemented Yet');
            }

            /**
             * If method ->role does n't exists then lets assume only there is a method called ->roles
             * if there is none, then dd explaining the reason
             */
            if (!method_exists($this, $model = $this->toPlural($model))) {
                dd("The Model doesn't have as method called: $model");
            }

        }

        /**
         * if name is an array as in the case of ->hasRole([$1, $2])
         * intersect with the collection and get the difference as the result
         */
        if (is_array($name)) {
            return !$this->{strtolower($model)}->pluck($identifier)->intersect($name)->isEmpty();
        }

        /**
         * Otherwise check one by one if the model is set
         */
        foreach ($this->{strtolower($model)} as $entity)
            if ($entity->{$identifier} == strtolower($name)) return true;

        /**
         * if nothing could be found then return false
         */
        return false;

    }

    /**
     * Check if string is plural
     *
     * @param $string
     * @return bool
     */
    protected function isPlural($string)
    {
        return str_plural($string) === (string)$string;
    }

    /**
     * Converts string to plural
     *
     * @param $string
     * @return bool
     */
    protected function toPlural($string)
    {
        return str_plural($string);
    }

    /**
     * Check if string is singular
     *
     * @param $string
     * @return bool
     */
    protected function isSingular($string)
    {
        return str_singular($string) === (string)$string;
    }


}