<?php

namespace DreamsArk\Http\Controllers\Admin;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Admin\AdminUserRequest;
use DreamsArk\Jobs\DeleteItemByObjectJob;
use DreamsArk\Jobs\Session\CreateUserJob;
use DreamsArk\Jobs\Session\UpdateUserJob;
use DreamsArk\Models\User\Role;
use DreamsArk\Models\User\User;
use Illuminate\Http\Request;

/**
 * Class AdminUserController
 * @package DreamsArk\Http\Controllers\Admin
 */
class AdminUserController extends Controller
{
    /**
     * @var string
     */
    private $defaultRoute = 'admin.user.index';

    /**
     * Display a listing of the resource.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        return view('admin.users.index')->with('users', $user->all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Role $role
     * @return \Illuminate\Http\Response
     */
    public function create(Role $role)
    {
        return view('admin.users.create')->with('roles', $role->all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param AdminUserRequest|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(AdminUserRequest $request)
    {
        $command = new CreateUserJob($request->except('role_id'), $request->get('role_id'));
        $this->dispatch($command);
        return redirect()->route($this->defaultRoute);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param User $user
     * @param Role $role
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function edit(User $user, Role $role)
    {
        return view('admin.users.edit', compact('user'))->with('roles', $role->all());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param AdminUserRequest|Request $request
     * @param User $user
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function update(AdminUserRequest $request, User $user)
    {
        $command = new UpdateUserJob($user, $request->except('role_id'), $request->get('role_id'));
        $this->dispatch($command);
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function destroy(User $user)
    {
        $response = dispatch(new DeleteItemByObjectJob($user));
        if (!$response)
            return redirect()->route($this->defaultRoute)->withErrors('Unable to delete record');
        return redirect()->route($this->defaultRoute)->withSuccess('Profile deleted successfully');
    }
}
