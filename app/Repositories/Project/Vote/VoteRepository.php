<?php

namespace DreamsArk\Repositories\Project\Vote;

use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Repositories\Traits\CRUDTrait;
use DreamsArk\Repositories\Traits\RepositoryHelperTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class VoteRepository implements VoteRepositoryInterface
{

    use RepositoryHelperTrait, CRUDTrait;

    /**
     * @var Vote
     */
    public $model;

    /**
     * @param Vote $vote
     */
    function __construct(Vote $vote)
    {
        $this->model = $vote;
    }

    /**
     * Return all open vote
     *
     * @return Collection
     */
    public function allOpened()
    {
        return $this->model->opened()->get();
    }

    /**
     * Create a Vote
     *
     * @param Model $model
     * @param string $open_date
     * @param string $close_date
     * @return \DreamsArk\Models\Project\Stages\Vote
     */
    public function create(Model $model, $open_date, $close_date)
    {
        /** Todo: Find a way to not massassign the open_date and close_date */

        return $model->vote()->create(compact('open_date', 'close_date'));
    }

    /**
     * Set Status to Open
     *
     * @param $vote_id
     * @return bool|int
     */
    public function open($vote_id)
    {
        return $this->model($vote_id)->setAttribute('active', true)->save();
    }

    /**
     * Set Status to Close
     *
     * @param $vote_id
     * @return bool|int
     */
    public function close($vote_id)
    {
        return $this->model($vote_id)->setAttribute('active', false)->save();
    }

    /**
     * Deactivate Vote
     *
     * @param int $vote_id
     * @return bool
     */
    public function deactivate($vote_id)
    {
        return $this->model($vote_id)->setAttribute('active', false)->save();
    }

}