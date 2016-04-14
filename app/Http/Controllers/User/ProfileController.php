<?php

namespace DreamsArk\Http\Controllers\User;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;

/**
 * Class ProfileController
 * @package DreamsArk\Http\Controllers
 */
class ProfileController extends Controller
{

    /**
     *
     */
    public function index(){
        return view('user.profile.index');
    }

    /**
     *
     */
    public function create(){
        return view('user.profile.index');
    }
}
