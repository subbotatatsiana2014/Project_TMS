<form method="post" action="{{ route('news.store') }}">
    @csrf
    <input name="title" type="text">
    <input name="description" type="text">
    <button type="submit">Save</button>
</form>
