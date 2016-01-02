<?php

namespace DreamsArk\Http\Controllers\User\Application;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use Illuminate\Http\Request;

class ActorController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('user.application.actor.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

}
