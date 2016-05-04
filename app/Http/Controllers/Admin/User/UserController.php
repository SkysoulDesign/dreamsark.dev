<?php

namespace DreamsArk\Http\Controllers\Admin\User;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Admin\User\StoreUserRequest;
use DreamsArk\Http\Requests\Admin\User\UpdateUserRequest;
use DreamsArk\Jobs\Admin\User\DeleteUserJob;
use DreamsArk\Jobs\Session\CreateUserJob;
use DreamsArk\Jobs\Session\UpdateUserJob;
use DreamsArk\Models\User\Role;
use DreamsArk\Models\User\User;
use Illuminate\Http\Request;

/**
 * Class AdminUserController
 *
 * @package DreamsArk\Http\Controllers\Admin
 */
class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     * @todo Implement repository
     */
    public function index(User $user)
    {
        return view('admin.users.index')->with('users', $user->paginate(config('defaults.settings.pagination.per_page')));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Role $role
     * @return \Illuminate\Http\Response
     * @todo Implements Repository
     */
    public function create(Role $role)
    {
        return view('admin.users.create')->with('roles', $role->all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreUserRequest|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {

        /**
         * Create User
         */
        $user = $this->dispatch(new CreateUserJob(
            $request->except('role_id'),
            $request->get('role_id')
        ));

        return redirect()->route('admin.user.index')->withSuccess("User: $user->username created successfully.");

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
        //@todo implement show method
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param User $user
     * @param Role $role
     * @return \Illuminate\Http\Response
     * @todo implement repository
     */
    public function edit(User $user, Role $role)
    {
        return view('admin.users.edit')->with('user', $user)->with('roles', $role->all());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUserRequest $request
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {

        /**
         * Update User
         */
        $user = $this->dispatch(new UpdateUserJob($user,
            $request->except('role_id'),
            $request->get('role_id')
        ));

        return redirect()->route('admin.user.index')->withSuccess("User: $user->username updated successfully.");

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param User $user
     * @return \Illuminate\Http\Response
     * @todo Make the job returns the deleted $profile instead of grabbing it from the function parameters
     */
    public function destroy(Request $request, User $user)
    {

        /**
         * Determines if user is authorized to perform this action
         */
        $this->authorize('delete-profile', $request->user());

        /**
         * Delete Profile
         */
        $this->dispatch(new DeleteUserJob($user));

        return redirect()->route('admin.user.index')->withSuccess("User: $user->username was deleted successfully");

    }

}
