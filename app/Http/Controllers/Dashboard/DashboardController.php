<?php

namespace DreamsArk\Http\Controllers\Dashboard;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Repositories\Project\Review\ReviewRepositoryInterface;

class DashboardController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @param ReviewRepositoryInterface $repository
     * @return \Illuminate\Http\Response
     */
    public function index(ReviewRepositoryInterface $repository)
    {
        return view('dashboard.index')->with('reviews', $repository->all()->load('project'));
    }

}