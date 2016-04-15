<?php

namespace DreamsArk\Http\Controllers\Admin;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;

/**
 * Class AdminHomeController
 * @package DreamsArk\Http\Controllers\Admin
 */
class AdminHomeController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @internal param User $user
     */
    public function index()
    {
        return view('admin.index');
    }
}
