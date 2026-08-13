# Roadie SDK utility: make_context

from roadie_sdk.core.context import RoadieContext


def make_context_util(ctxmap, basectx):
    return RoadieContext(ctxmap, basectx)
