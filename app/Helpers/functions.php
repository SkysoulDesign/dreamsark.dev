<?php

if (!function_exists('active')) {

    /**
     * Set current --active state of an item by the route name
     *
     * @param $name
     * @param string $class
     * @param bool $withClass
     * @return string
     */
    function active($name, $class = '--active', $withClass = false)
    {

        if ($withClass) {
            $class = "class=\"$class\"";
        }

        return request()->route()->getName() === $name ? $class : '';
    }

}