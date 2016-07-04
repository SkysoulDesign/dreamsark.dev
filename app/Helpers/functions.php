<?php

if (!function_exists('active')) {

    /**
     *
     * @param $name
     * @return string
     */
    function active($name)
    {
        return request()->route()->getName() === $name ? 'active' : '';
    }

}