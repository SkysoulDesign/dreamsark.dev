<?php

namespace DreamsArk\Repositories\Project\Expenditure;

use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Project\Expenditures\Enroller;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\Project\Expenditures\Type;
use DreamsArk\Repositories\Traits\CRUDTrait;
use DreamsArk\Repositories\Traits\RepositoryHelperTrait;

class ExpenditureRepository implements ExpenditureRepositoryInterface
{

    use RepositoryHelperTrait, CRUDTrait;

    /**
     * @var Expenditure $expenditure
     */
    public $model;

    /**
     * @param Expenditure $expenditure
     */
    function __construct(Expenditure $expenditure)
    {
        $this->model = $expenditure;
    }

    /**
     * Create new Type
     * @param string $name
     * @param int $type_id
     * @return Expenditure
     * @throws \DreamsArk\Repositories\Exceptions\RepositoryException
     */
    public function create($name, $type_id)
    {
        return $this->newInstance($type_id, Type::class)->model->position()->create(compact('name'));
    }

    /**
     * Create new Type
     * @param $name
     * @return Type
     * @throws \DreamsArk\Repositories\Exceptions\RepositoryException
     */
    public function createType($name)
    {
        return $this->newInstance(Type::class)->model->create(compact('name'));
    }

    /**
     * Get All Profiles
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     * @throws \DreamsArk\Repositories\Exceptions\RepositoryException
     */
    public function profiles(){
        return $this->newInstance(Profile::class)->model->all();
    }

    /**
     * Enroll into a Expenditure
     *
     * @param int $expenditure_id
     * @param int $user_id
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     * @throws \DreamsArk\Repositories\Exceptions\RepositoryException
     */
    public function enroll($expenditure_id, $user_id)
    {
        return $this->model($expenditure_id)->users()->attach($user_id);
    }

    /**
     * Unroll from a Expenditure
     *
     * @param int $expenditure_id \
     * @param int $user_id
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     * @throws \DreamsArk\Repositories\Exceptions\RepositoryException
     */
    public function unroll($expenditure_id, $user_id)
    {
        return $this->model($expenditure_id)->users()->detach($user_id);
    }

    /**
     * Create a new command instance.
     *
     * @param int $enroller_id
     * @param int $user_id
     * @param $amount
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \DreamsArk\Repositories\Exceptions\RepositoryException
     */
    public function vote($enroller_id, $user_id, $amount)
    {
        return $this->newInstance($enroller_id, Enroller::class)->model->votes()->attach($user_id, compact('amount'));
    }

}