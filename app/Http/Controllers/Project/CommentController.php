<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\Project\CommentCreation;
use DreamsArk\Jobs\Project\CreateCommentJob;
use DreamsArk\Models\Project\Project;

/**
 * Class CommentController
 *
 * @package DreamsArk\Http\Controllers\Project
 */
class CommentController extends Controller
{
    /**
     * @param \DreamsArk\Http\Requests\Project\CommentCreation $request
     * @param \DreamsArk\Models\Project\Project $project
     * @param string $type
     */
    public function store(CommentCreation $request, Project $project, $type)
    {
        /**
         * Dispatch CreateCommentJob
         */
        $this->dispatch(new CreateCommentJob(
            $request->user(),
            $project->{$type},
            $request->input('content')
        ));

        return redirect()->back()->withSuccess(
            trans('comments.comment-created-success')
        );
    }
}
