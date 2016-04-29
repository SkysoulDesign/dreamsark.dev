<?php
namespace DreamsArk\Models\Traits;

use DreamsArk\Models\Project\Reward;

/**
 * Class RewardableTrait
 *
 * @package DreamsArk\Models\Traits
 */
trait RewardableTrait
{
    /**
     * @return mixed
     */
    public function reward()
    {
        return $this->morphOne(Reward::class, 'rewardable');
    }

}