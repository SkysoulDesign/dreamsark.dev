<?php

namespace DreamsArk\Jobs\Game;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Game\Item;
use DreamsArk\Models\Game\Stage;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CreateGameRewardsJob
 *
 * @package DreamsArk\Jobs\Game
 */
class CreateGameRewardsJob extends Job
{
    /**
     * @var Model
     */
    private $model;

    /**
     * Create a new job instance.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Execute the job.
     *
     * @param \DreamsArk\Models\Game\Stage $stage
     * @param \DreamsArk\Models\Game\Item $item
     */
    public function handle(Stage $stage, Item $item)
    {



//        $stage->stage()->associate($this->model);
//        $stage->setAttribute('reward_points', ['min' => 0, 'max' => 100]);
//        $stage->setAttribute('give_reward', ['min' => 1, 'max' => 3]);
//
//        $groups = [];
//
//        foreach (['A', 'B', 'C'] as $group) {
//            array_push($groups, [
//                'group' => $group,
//                'probability' => rand(17, 70)
//            ]);
//        }
//
//        $stage->setAttribute('group_and_probability', $groups);
//        $stage->save();

    }
}
