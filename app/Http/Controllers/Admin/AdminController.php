<?php

namespace DreamsArk\Http\Controllers\Admin;

use DreamsArk\Http\Controllers\Controller;

/**
 * Class AdminHomeController
 *
 * @package DreamsArk\Http\Controllers\Admin
 */
class AdminController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @internal param User $user
     */
    public function index()
    {
//        $routeCollection = Route::getRoutes();
        $routes = [
            ['label' => trans('navbar.configuration'), 'list' => [
                ['name' => 'admin.profile.index', 'label' => trans('navbar.profile')],
                ['name' => 'admin.question.index', 'label' => trans('navbar.questions')],
                ['name' => 'admin.user.index', 'label' => trans('navbar.users')],
            ]],
            ['label' => trans('navbar.tasks'), 'list' => [
                ['name' => 'admin.projects', 'label' => trans('navbar.discover-project')],
                ['name' => 'committee.project.review.list', 'label' => trans('navbar.project-in-review')],
                ['name' => 'committee.project.fund.list', 'label' => trans('navbar.project-in-fund')],
                ['name' => 'committee.project.distribute.list', 'label' => trans('navbar.project-in-distribute')],
            ]],
            ['label' => trans('navbar.transactions'), 'list' => [
                ['name' => 'admin.transactions.purchases', 'label' => trans('navbar.purchases'), 'param' => ['all']],
                ['name' => 'admin.transactions.withdraw', 'label' => trans('navbar.withdrawals'), 'param' => ['all']],
            ]]
        ];

        return view('admin.index', compact('routes'));
    }

}
