<?php

namespace DreamsArk\Models\Traits;

use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\VotingException;

trait VotableTrait
{

    /**
     * Order That A project show Follow
     *
     * @var array
     */
    private $order = array('idea', 'synapse', 'script', 'review', 'fund');

    /**
     * Define which model is the Next on its creation order
     */
    public function next()
    {
        if (!$this->next or !class_exists($this->next)) {
            throw new VotingException('Please set the protected $next to the model.');
        }

        return app()->make($this->next);
    }

    /**
     * Get all of the product's photos.
     */
    public function vote()
    {
        return $this->morphOne(Vote::class, 'votable');
    }

    /**
     * Check if is the last Stage
     *
     * @return bool
     */
    public function isLastStage()
    {
        return strtolower(class_basename($this)) === last($this->order);
    }

    /**
     * Check if is the last Stage
     *
     * @return bool
     */
    public function getStageName()
    {
        return strtolower(class_basename($this));
    }

}