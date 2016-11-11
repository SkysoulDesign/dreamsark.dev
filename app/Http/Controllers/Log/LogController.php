<?php

namespace DreamsArk\Http\Controllers\Log;

use DreamsArk\Http\Controllers\Controller;

/**
 * Class LogController
 *
 * @package DreamsArk\Http\Controllers\Log
 */
class LogController extends Controller
{
    /**
     *
     */
    public function index()
    {
        return view('log.index');
    }
}
