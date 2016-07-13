<?php

if (!function_exists('active')) {

    /**
     * @param $name
     * @param $value
     * @return string
     */
    function active($name, $value)
    {
        return $name === $value ? 'active' : '';
    }

}

if (!function_exists('activeRoute')) {

    /**
     * @param $name
     * @return string
     */
    function activeRoute($name)
    {
        return active($name, request()->route()->getName());
    }

}
